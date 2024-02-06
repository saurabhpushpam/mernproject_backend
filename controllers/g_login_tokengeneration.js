const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email: email });
    // console.log("userexist-> ", userExist); //O/P: all details

    if (!userExist) {

      res.status(400).send("Invalid Credential")
    }
    else {

      // compare method declared and use here
      /* const userPassWord = await bcrypt.compare(password, userExist.password); */

      // compare method declared in user-model and use here
      const userPassWord = await userExist.comparePassword(password);

      if (userPassWord) {

        // token

        /*
        const myId = await userExist._id;
        // const token = await jwt.sign({ _id: myId },
        // process.env.JWT_SECRET_KEY)
          */

        /**** */

        // hm jwt.sign() me jo v payload paas krenge, to jb hm token ko verify kr lete hia to wo data hme is tarah se mil jata hai.

        // To hm jo v data yaha se pass karenge to jb token verify ho jayega to in response hme wo data milta hia. isAdmin Islliye kiya bcz hm pata laga ske hi wo admin hai ya nhi. email bcz is se hm mongodb me koi v query laga sakte hai ki ye email ka koi data exist or not.

        const myId = await userExist._id;
        const myEmail = await userExist.email;
        const myIsAdmin = await userExist.isAdmin;
        const token = await jwt.sign({ _id: myId, email: myEmail, isAdmin: myIsAdmin },
          process.env.JWT_SECRET_KEY)





        res.status(200).send({
          message: "Login Successful",
          token: token,
          userId: myId.toString()
        })
      }
    }
  }
  catch (e) { }
}