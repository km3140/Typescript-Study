import crypto from 'crypto';
//     👆 ts가 js로 만들어진 라이브러리의 type을 모르기 때문에 오류가 뜸
//        해당 라이브러리의 타입이 명시된 .d.ts 파일이 필요하기 때문인데
//        DefinitelyTyped 레포에 천사들이 작성해준 .d.ts의 파일들이 모여있다
//        고로 npm i @types/node를 해서 노드 라이브러리들의 .d.ts파일을 받아줌
//        @types/[라이브러리명] 으로 특정 모듈의 .d.ts만 받을 수도 있음

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public hash: string;
  constructor(public prevHash: string, public height: number, public data: string) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }

  static calculateHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash('sha256').update(toHash).digest('hex');
  }
}

class Blockchain {
  private blocks: Block[];

  constructor() {
    this.blocks = [];
  }

  private getPrevHash() {
    if (this.blocks.length === 0) return '';
    return this.blocks[this.blocks.length - 1].hash;
  }

  public addBlock(data: string) {
    const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data);
    this.blocks.push(newBlock);
  }

  public getBlocks() {
    return [...this.blocks];
    //       👆 spread를 안하면 블록체인(배열) 원본에 접근할 수 있기 때문
  }
}

const blockchain = new Blockchain();

blockchain.addBlock('first one');
blockchain.addBlock('second one');
blockchain.addBlock('third one');

console.log(blockchain.getBlocks());
