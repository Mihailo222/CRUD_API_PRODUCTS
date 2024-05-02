const Product = require('../models/product.model');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
       // console.log(products)
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const getProduct = async (req, res) => {
    try {
        // console.log(req.params)
         const { id } = req.params;
         console.log(id)
         const product = await Product.findById(id);
         
         res.status(200).json(product);
     } catch (error) {
         res.status(500).json({message: error.message});
     }
 


}

const createProduct = async (req, pres) => {
        //console.log(req);
    //console.log(req.body);
    //res.send("Data received");
    try {
        //mora await jer ce malo duze da potraje cuvanje producta (nije sinhrono)
        const product = await Product.create(req.body);
        //.create cuva model u mongo bp; mongo daje id svakom dodatom objektu, pa cim ti se u http odgovoru pojavi id, znaci da je uspesno sacuvano
        //ovaj se model u mongoDB cuva kao kolekcija koja je storovana u bp
        res.status(200).json(product); //vrati mi dati prodcut
    } catch (error) {
        res.status(500).json({message: error.message});
    }


}

const updateProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){ //ako nema proizvoda sa datim ID-jem
            return res.status(404).json({message:"Product not found"});
        }
        //vrati mi updateovan proizvod
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteProduct = async (req, res) => {
    try {
        console.log(req);
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product) { //ukoliko ne postoji product sa id-jem
            return res.status(404).json({message: "Product not found."})
        }
        res.status(200).json({message: `Product with id ${id} successfully deleted.`})

    } catch (error) {
        return res.status(404).json({message: error.message})
    }

}


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};