const fs = require("fs")
const path = require("path")
const fileData= path.join(process.cwd(),"data","products.json")
const readData=()=>{
   return new Promise ((resolve,reject)=>{
        fs.readFile(fileData,(err,data)=>{
            if(err){
                reject()
            }
            else{
                resolve(JSON.parse(data.toString()))
            }
        })
    })
}
const writeData=(data)=>{
       return new Promise ((resolve,reject)=>{
    fs.writeFile(fileData,JSON.stringify(data),(err)=>{
 if(err){
                reject()
            }
            else{
                resolve()
            }
    })
       })
}
exports.createProduct=async(title,price,rating,image )=>{
const products = await readData();
await writeData([...products,{ title,price,rating,image }])
}
// GET products
exports.getProducts = async () => {
  const products = await readData();

  return products;
};