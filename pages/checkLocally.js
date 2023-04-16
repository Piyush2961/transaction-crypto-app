export const checkLocally = (user) =>{
  if(user && user.token && user.token.length > 0) {
    return true;
  }
  return false;
}