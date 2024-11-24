
const validate = (schema) => async (req, res, next) => {
    try {
      const parseBody = await schema.parseAsync(req.body);
      req.body = parseBody;
      next();

    } catch (err) {
      // res.status(400).json({msg:err.errors[0].message});
        const status=400;
        const message = "fill the input properly";
        const Extradetails = err.errors[0].message;

        error ={
          status,
          message,
          Extradetails,
        }
        next(error);

    }
  };

// const validate = (schema) => async (req, res, next) => {
//   try {
//       console.log("Incoming Request Body: ", req.body);
//       const parseBody = await schema.parseAsync(req.body);
//       req.body = parseBody;
//       return next();
//   } catch (err) {
//       console.error("Validation Errors: ", err.issues);
//       const extraDetails = err.issues.map((curElem) => curElem.message);
//       next(extraDetails);
//   }
// };

  
  module.exports = validate;