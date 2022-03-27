const bcrypt = require('bcrypt')
import config from '../../config/default'
import logger from '../logger/logger'

export const hashPass = async (password:string):Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(config.setWorkFactor)
    const hashPass = await bcrypt.hash(password,salt)
  
    return hashPass
  } catch (error) {

    logger.error(error)
    return 'Something wrong happen'
  } 
}
