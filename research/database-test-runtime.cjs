const {DatabaseSync}=require('node:sqlite'),fs=require('node:fs'),Module=require('node:module'),ts=require('typescript');
exports.setup=function(bucket){
 const sqlite=new DatabaseSync(':memory:');sqlite.exec(fs.readFileSync('drizzle/0000_brave_diamondback.sql','utf8'));
 let fail=false;
 function prepare(sql){let args=[];return {bind(...values){args=values;return this;},async first(column){const row=sqlite.prepare(sql).get(...args);return row?(column?row[column]:row):null;},async all(){return {results:sqlite.prepare(sql).all(...args)};},async run(){return sqlite.prepare(sql).run(...args);},_run(){return sqlite.prepare(sql).run(...args);}};}
 const db={prepare,async batch(statements){sqlite.exec('BEGIN');try{const r=statements.map(s=>{if(fail){fail=false;throw new Error('Injected batch failure');}return s._run();});sqlite.exec('COMMIT');return r;}catch(e){sqlite.exec('ROLLBACK');throw e;}}};
 const env={DB:db,BUCKET:bucket,UPDATE_KEY:'test-updater-secret',SESSION_SECRET:'test-session-secret'};
 const load=Module._load;Module._load=function(id,...args){return id==='cloudflare:workers'?{env}:load.call(this,id,...args);};
 require.extensions['.ts']=(m,f)=>m._compile(ts.transpile(fs.readFileSync(f,'utf8'),{module:ts.ModuleKind.CommonJS,esModuleInterop:true,target:ts.ScriptTarget.ES2022}),f);
 return {sqlite,db,env,failNextBatch(){fail=true;}};
};
