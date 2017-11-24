/**
 * Auth: lijiang
 * Date: 2017/11/10
 * Description: Brand
 */
import {default as ModelBase} from './ModelBase';

class Brand extends ModelBase {
  constructor () {
    super('Brand');
  }

  data () {
    return {
      'ID': null,
      'BRAND_NAME': ''
    };
  }
}

export const BRAND_PAGE_HEADER = [];

export default Brand;
