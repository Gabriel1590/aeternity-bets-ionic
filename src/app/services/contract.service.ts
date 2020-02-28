import { Injectable } from '@angular/core';
// import { Aepp } from '@aeternity/aepp-sdk/';
import Aepp from '@aeternity/aepp-sdk/es/ae/aepp';
import contractDetails from '../../assets/contracts/sophia.js';
// import Ae from '@aeternity/aepp-sdk/es/ae/';
// import Aepp from '@aeternity/aepp-sdk/es/ae/aepp';
// import Aepp from '@aeternity/aepp-sdk/es/ae';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  // Address of the Contract
  contractSource: any;
  client = null;
  node: any;
  acc: any;

  constructor( ) {
  }

  async get() {
    this.client = Aepp();
    console.log(contractDetails);
    try {
      // Aepp approach
      this.client = await Aepp();
      const contractInstance = await this.client
      .getContractInstance(contractDetails.contractSource, { contractAddress: contractDetails.contractAddress });
      // Calling the function 'getUser()' that detects the user by an id (E1AHz2NGgOPisLtWNNOkevL9k3W2)
      const calledGet = await contractInstance
      .call('getUser', ['E1AHz2NGgOPisLtWNNOkevL9k3W2'], {callStatic: true}).catch(e => console.error(e));
      console.log('calledGet', calledGet);

      const decodedGet = await calledGet.decode().catch(e => console.error(e));
      console.log('decodedGet', decodedGet);

    } catch (err) {
      console.log(err);
    }
  }

}
