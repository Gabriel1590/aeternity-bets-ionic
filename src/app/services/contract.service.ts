import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Aepp from '@aeternity/aepp-sdk/es/ae/aepp';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  // Address of the Contract
  contractAddress = 'ct_2Sc2HBMMYvp5JgMLd4BVtCTwP3dpfFqAvEHYNQ22g1yNiEsUtA';
  contractSource: any;
  client = null;
  node: any;
  acc: any;

  constructor( private http: HttpClient ) {
  }

  get() {
    // Getting the contract named sophia.aes inside assets/contracts
    this.http.get('assets/contracts/sophia.aes', { responseType: 'text' as 'json'}).subscribe(async (data) => {
      this.contractSource = data; // This works
      try {
        // Aepp approach
        this.client = await Aepp();
        const contractInstance = await this.client.getContractInstance(this.contractSource, { contractAddress: this.contractAddress });
        // Calling the function 'getUser()' that detects the user by an id (E1AHz2NGgOPisLtWNNOkevL9k3W2)
        const calledGet = await contractInstance
        .call('getUser', ['E1AHz2NGgOPisLtWNNOkevL9k3W2'], {callStatic: true}).catch(e => console.error(e));
        console.log('calledGet', calledGet);

        const decodedGet = await calledGet.decode().catch(e => console.error(e));
        console.log('decodedGet', decodedGet);

      } catch (err) {
        console.log(err);
      }
    });
  }

}
