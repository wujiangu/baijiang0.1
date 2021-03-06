/**
 * 加载配置文件管理
 */
namespace ConfigManager {
    /**关卡配置文件 */
    export var tcStage:any;
    /**英雄数据配置文件 */
    export var heroConfig:any;
    /**敌方配置文件 */
    export var enermyConfig:any;
    /**buff配置文件 */
    export var buffConfig:any;
    /**貂蝉属性配置 */
    export var diaochanAttr:any;
    /**不小曼属性配置 */
    export var buxiaomanAttr:any;
    /**赵云属性配置 */
    export var zhaoyunAttr:any;
    /**小兵的属性配置 */
    export var monsters:Array<any> = new Array();
    /**boss的属性配置 */
    export var boss:Array<any> = new Array();

    /**装备配置文件 */
    export var tcEquip:any;
    /**英雄描述配置文件 */
    export var tcHero:any;
    /**技能配置文件 */
    export var tcSkill:any;
    /**天赋配置文件 */
    export var tcTalent:any;
    /**天赋消耗配置文件 */
    export var tcTalentUp:any;
    /**解锁天赋页配置文件 */
    export var tcUnlockTalentPage:any;
    /**骨架数据 */
    export var armatures:Array<string> = ["daoguang_effect", "diaochan", "monster01", "enter_monster_01", "Boss01",
        "Boss01_effect01", "blood_die", "diaochan_skill", "zhaoyun", "zhaoyun_skill", "buxiaoman", "buxiaoman_skill", "buff",
        "monster03", "monster02", "monster02_skill"];
    /**
     * 加载配置文件
     */
    export function loadConfig() {
        tcStage = RES.getRes("TcStage_json");
        heroConfig = RES.getRes("heroConfig_json");
        enermyConfig = RES.getRes("enermyConfig_json");
        buffConfig = RES.getRes("buffConfig_json");

        tcEquip = RES.getRes("TcEquip_json");
        tcHero = RES.getRes("TcHero_json");
        tcSkill = RES.getRes("TcSkill_json");
        tcTalent = RES.getRes("TcTalent_json");
        tcTalentUp = RES.getRes("TcTalentUp_json");
        tcUnlockTalentPage = RES.getRes("TcUnlockTalentPage_json");
        initBattleDragonBones();
        loadHeroConfig();
        loadEnermyConfig();
    }

    /**加载英雄的配置文件 */
    function loadHeroConfig() {
        diaochanAttr = RES.getRes("TcChanAttr_json");
        buxiaomanAttr = RES.getRes("TcManAttr_json");
        zhaoyunAttr = RES.getRes("TcYunAttr_json");
    }

    /**加载敌方的配置文件(暂定) */
    function loadEnermyConfig() {
        //小兵
        for (let i = 1; i <= 3; i++) {
            let file:string = `TcMonster0${i}_json`;
            let data:any = RES.getRes(file);
            monsters.push(data);
        }
        //boss
        for (let i = 1; i <= 1; i++) {
            let file:string = `TcBoss0${i}_json`;
            let data:any = RES.getRes(file);
            boss.push(data);
        }
    }

    export function isInArmatures(name:string):boolean {
        let status:boolean = false;
        for (let i = 0; i < armatures.length; i++) {
            if (armatures[i] == name) {
                status = true;
                break;
            }
        }
        return status;
    }

    /**
     * 初始化骨骼的动画数据
     */
    function initBattleDragonBones():void {
        for (let i = 0; i < armatures.length; i++) {
            let name:string = armatures[i];
            let skeletonData = RES.getRes(name+"_ske_json");
            let textureData = RES.getRes(name+"_tex_json");
            let texture = RES.getRes(name+"_tex_png");
            DragonBonesFactory.getInstance().initDragonBonesArmatureFile(skeletonData, textureData, texture);
        }
    }
}