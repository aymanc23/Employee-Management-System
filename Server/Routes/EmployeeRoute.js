import express from 'express'
import con from "../utils/db.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';

const employeeRouter = express.Router()

employeeRouter.post("/employee_login", (req, res) => {
    const sql = "SELECT * from employee Where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
      if (result.length > 0) {
        //check password for employee
        bcrypt.compare(req.body.password, result[0].password, (err, response) => {
            
            if (response) {
                const email = result[0].email;
                const token = jwt.sign(
                    { role: "employee", email: email, id: result[0].id},
                    "jwt_secret_key",
                    { expiresIn: "1d" }
                );
                res.cookie('token', token)
                return res.json({ loginStatus: true, id: result[0].id });
            } else {
                return res.json({ loginStatus: false, Error:"You have entered an incorrect email or password. Please try again." });
            }
        })

        
        
      }
    });
  });

  employeeRouter.get('/detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee where id = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false});
        return res.json(result)
    })
  })
  employeeRouter.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
  })

  export {employeeRouter}