export default {
  contractAddress: "ct_2Sc2HBMMYvp5JgMLd4BVtCTwP3dpfFqAvEHYNQ22g1yNiEsUtA",
  contractSource: `payable contract BetHighLow =
  record user = 
    { uid: string,
      creatorAddress: address,
      balance: int }
    
  record state = 
    { users: map(string, user),
      contractAddress: address}
  
  entrypoint init() = 
    { users = {}, 
      contractAddress = Contract.address}
  
  entrypoint getUser(index: string) : user =
    switch(Map.lookup(index, state.users))
	    None    => abort("There was no user with this id registered.")
	    Some(x) => x
    
  stateful entrypoint registerUser( uid': string ) =
    let address = Call.caller
    let user = 
      { creatorAddress = address,
        uid = uid', 
        balance = 0 }
    put(state { users[uid'] = user })

  payable stateful entrypoint updateFunds(uid' : string, add: bool) =
    let user = getUser(uid')
    let value = Call.value
    if (add == true)
      Chain.spend(state.contractAddress, value)
      let updatedFunds = user.balance + value
      let updatedUser = state.users{ [uid'].balance = updatedFunds }
      put(state{ users = updatedUser })
    else
      Chain.spend(user.creatorAddress, value)
      let updatedFunds = user.balance - value
      let updatedUser = state.users{ [uid'].balance = updatedFunds }
      put(state{ users = updatedUser })`
};
