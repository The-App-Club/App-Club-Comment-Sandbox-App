export namespace AppConst {
  export namespace PLAN_CATEGORY {
    export const ENTERPRISE = 'enterprise'
    export const TEAM = 'team'
    export const getList = () => {
      return [AppConst.PLAN_CATEGORY.ENTERPRISE, AppConst.PLAN_CATEGORY.TEAM]
    }
  }
  export namespace ACCOUNT_CATEGORY {
    export const OWNER = 'owner'
    export const MEMBER = 'member'
    export const getList = () => {
      return [AppConst.ACCOUNT_CATEGORY.OWNER, AppConst.ACCOUNT_CATEGORY.MEMBER]
    }
  }
  export const DEFALUT_TAX_RATE = 10
}
