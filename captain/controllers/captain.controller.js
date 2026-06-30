const captainModel = require('../models/captain.model');
const blacklisttokenModel = require('../models/blacklisttoken.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const captain = await captainModel.findOne({ email });

        if(captain){
            return res.status(400).json({ message: 'User already exist'});
        }

        const hash = await bcrypt.hash(password, 10);
        const newUser = new captainModel({ name, email, password });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h'});
      
        delete captain._doc.password; // why? delete password

        res.cookie('token', token);

        res.send({ token, captain });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const captain = await captainModel.findOne({ email }).select(+password);

        if(!captain) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, captain.password);

        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }


        const token = jwt.sign({ id: captain._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        delete captain._doc.password; // why? delete password

        res.cookie('token', token);

        res.send({ token, captain });

    }catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports.logout = async (req, res) => {
    try {
        const token = req.cookie.token;
        await blacklisttokenModel.create({ token }); //
        res.clearCookie('token');
        res.send({ message: 'User logged out Successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports.profile = async (req, res) => {
    try {
        res.send(req.captain);
    } catch(err) {
        res.status(500).json({ message: err.message });

    }
}

module.exports.toggleAvailability = async (req, res) => {
    try {
        const captain = await captainModel.findById(req.captain);
        captain.isAvailable = !captain.isAvailable;
        await captain.save();
        res.send(captain);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}