/**
 * 游戏数据
 */
class GameData {
    /**
     * 从服务器获取数据
     */
    public static saveData(data:any):void {
        GameData.initData = data;
    }

    /**英雄 */
    public static heros:Array<Hero>;
    /**血量 */
    public static hp:number;
    /**当前关卡 */
    public static curStage:number = 1;
    /**敌人 */
    public static monsters:Array<Monster>;
    /**Boss */
    public static boss:Array<Boss>;
    /**木桩 */
    public static stakes:Array<Stakes>;
    /**当前英雄 */
    public static curHero:string = "zhaoyun";
    /**存储一些游戏的初始数据 */
    public static initData:any = null;
}