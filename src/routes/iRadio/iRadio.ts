import express from 'express';
const router = express.Router();
const iRadioController = require('../../controllers/iRadio/iRadioController');

router.get('/', (req, res) => {
    res.json({about: "IRadio api offers over 50000 internet radio station and real time info duing playback."})
})
router.get('/stations', iRadioController.getPaginatedStations);


module.exports = router;
