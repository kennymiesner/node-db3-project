const Scheme = require('./scheme-model')

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const scheme = await Scheme.findById(req.params.id)
    if (!scheme) {
      next({
        status: 404,
        message: `scheme with scheme_id ${scheme} not found`
      })
    } else {
      req.scheme = scheme
      next()
    }
  } catch (err) {
    next(err)
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = async (req, res, next) => {
  try {
    const name = await Scheme.find(req.body.name)
    if (!name || name === undefined) {
      next({
        status: 400,
        message: 'invalid scheme_name'
      })
    } else {
      req.name = name
      next()
    }
  } catch (err) {
    next(err)
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = async (req, res, next) => {
  try {
    const step = await Scheme.findSteps(req.body.step)
    if (step === NaN || step < 1) {
      next({
        status: 400,
        message: 'invalid step'
      })
    } else {
      req.step = step
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
