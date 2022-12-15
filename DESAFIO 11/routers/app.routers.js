const path = require('path');
const express = require('express');
const apiRoutes = require('./api/api.routes');
const auth = require('../middlewares/auth');

const router = express.Router();


//Routes
router.use('/api', apiRoutes);

router.get('/', async(req, res) => {
  res.sendFile('login.html', {root: 'public'})
})

router.get('/login', async(req, res) => {
  res.sendFile('login.html', {root: 'public'})
})//! ESTE GET ES REITERATIVO CON EL HOME, VER DESPUES SI SE DEJA O NO!

router.get('/register', async(req, res) => {
  res.sendFile('signup.html', {root: 'public'})
})

router.get('/profile', auth, async (req, res) => {
  const user = req.user;
  res.render('profile.ejs', { username: user.firstname });
});

router.get('/logout', auth, (req, res, next) => {
  req.logOut(() => {
    console.log('User logued out');
    res.redirect('/');
  })
})

module.exports = router;

/* router.get('/', async (req, res) => {
  const user = req.user;
  if (user) {
    return res.render('/profile.ejs', {username: user.firstname});
  }
  else {
    return res.redirect(path.resolve('login'));
  }
}); */

/* 
router.get('/logout', auth, (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if(err){
        console.log(err);
        res.clearCookie('my-session');
      } else {
        res.clearCookie('my-session');
        res.render(path.join(process.cwd(), './public/logout.ejs'))
      } 
    })
  } catch (err) {
    console.log(err)
  }
}) */
/*   req.logOut((done) => {
    console.log('User logued out');
    res.redirect('/');
  });
}); */

