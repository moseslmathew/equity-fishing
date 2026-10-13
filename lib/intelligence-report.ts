export type EvidenceSource={label:string;url:string;kind:string;period:string;checkedOn:string};
export type IntelligenceReport={
 takeaways:{title:string;text:string;refs:number[]}[];
 cases:{title:string;status:string;evidence:string;thesis:string;challenge:string;catalyst:string;refs:number[]}[];
 perspectives:{title:string;text:string;refs:number[]}[];
 scenarios:{title:string;text:string}[];
 selectionNote:string;
 mediaNote:string;
};
