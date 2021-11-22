const router = require('express').Router();
const { newUser } = require('../model/new_User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth')





router.get('/', (req, res) => {
    res.render('index')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/signin', async function (req, res) {

    try {
        const user = await newUser.findOne({ username: req.body.username })
        console.log(user);
        if (!user) {
            res.send('username isnt found')
        }
        if (user && (await bcrypt.compare(req.body.password, user.password))) {
            const token = await user.generateAuthToken();
            console.log("----------------------------", token)
            res.status(200).send(token);

        }

    } catch (error) {
        console.log(error.message);
    }
})
router.post('/signup', async function (req, res) {
    try {
        console.log(req.body);
        const data = await newUser.create(req.body);
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt)
        await data.save();
        // console.log(process.env.TOKEN_KEY);
        console.log(data);
        res.json(data)
        res.redirect('login')
    } catch (error) {
        console.log(error.message);
    }
})

router.get('/me', auth, async (req, res) => {

    try {
        console.log("..............................");
        const user = await newUser.findById({ _id: req.user._id })
        res.send(user)
    } catch (error) {

        res.send(error);
    }
})


router.get('/product', async function (req, res) {
    res.render('addproduct')
})
router.get('/getproduct', async function (req, res) {
    try {
        const data = await Product.find()
        console.log(data);
        res.render('product', {
            products: data,
        })
    }
    catch (error) {
        console.log(error.message);
    }
})




module.exports = router;
