import jwt from 'jsonwebtoken'

const authMiddleware =async(req,res,next)=>{
 const {token} =req.headers;
 if(!token){
  return res.json({success:false ,message:"Not Authorized Login Again"});
 }try{
  const token_decode =jwt.verify(token,process.env.JWT_SECRET);
  req.user = token_decode;
  req.userId = token_decode.id;
  next();
 }catch(error){
  return res.status(401).json({success:false ,message:"Your session is invalid or has expired. Please sign in again."})
 }
}
export default authMiddleware;
