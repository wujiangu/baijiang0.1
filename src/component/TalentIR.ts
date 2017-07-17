class TalentIR extends Base {
    public constructor(pageCount:number) {
        super();
        this.page = pageCount;
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = "resource/game_skins/talentSkinIR.exml";
    }
    protected createChildren(): void{
        this.iconGroup = new Array();
        this.lvGroup = new Array();
        this._maxLv = new Array();
        for (let i = 0; i < ConfigManager.tcTalent.length; i++) {
            let talentConf:any = ConfigManager.tcTalent[i];
            let maxLv:number = talentConf.value.length;
            this._maxLv.push(maxLv);
        }
    }

    protected childrenCreated():void {
        for (let i = 1; i < 4; i++) {
            for (let j = 0; j < 7; j++) {
                let id = 7*i+j-6;
                this.iconGroup[id-1] = new eui.Group();
                let iconImage:eui.Image = new eui.Image();
                iconImage.source = `talent${i}_${j+1}_png`;
                this.iconGroup[id-1].addChild(iconImage);

                let boxBg:eui.Image = new eui.Image();
                boxBg.source = "talentLvBox_png";
                this.iconGroup[id-1].addChild(boxBg);
                boxBg.x = 4;
                boxBg.y = 72;

                //等级
                this.lvGroup[id-1] = new eui.Label();
                this.lvGroup[id-1].textColor = 0x6f685d;
                this.lvGroup[id-1].text = `0/${this._maxLv[id-1]}`;
                this.lvGroup[id-1].fontFamily = "Microsoft YaHei";
                this.lvGroup[id-1].right = 4;
                this.lvGroup[id-1].size = 18;
                this.lvGroup[id-1].x = boxBg.x;
                this.lvGroup[id-1].y = boxBg.y+4;
                this.iconGroup[id-1].addChild(this.lvGroup[id-1]);

                //遮罩
                let mask = Utils.createBitmap("mask_png");
                mask.width = 100;
                mask.height = 100;
                // mask.visible = false;
                this.iconGroup[id-1]["Mask"] = mask;
                this.iconGroup[id-1]["lv"] = 0;
                this.iconGroup[id-1].addChild(mask);

                //外框
                let box = Utils.createBitmap("talentMaxBox_png");
                this.iconGroup[id-1]["box"] = box;
                box.visible = false;
                this.iconGroup[id-1].addChild(box);

                this.iconGroup[id-1].x = this.position[j][0] + (i-1)*360;
                this.iconGroup[id-1].y = this.position[j][1];
                this.iconGroup[id-1].name = `${id}`;
                this.iconGroup[id-1].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onIconListener, this)
                this.talentGroup.addChild(this.iconGroup[id-1]);
            }
        }
        this.pageText.text = `第${this.page}页`;
        this.initUnlockAndLv(this.page);
        this.ShowCanClickTalent();
    }
    private onComplete():void {
        // this.setUnlock();
    }

    private onIconListener(event:egret.TouchEvent):void {
        let id = event.currentTarget.name;
        this.curTalentId = parseInt(id);
        Common.log(JSON.stringify(modTalent.getUnlockTalent()));
        TalentDialog.instance.showPopup(this.curTalentId, parseInt(event.currentTarget["lv"]), this._maxLv[this.curTalentId-1])
    }

    /**
     * 初始化解锁状态和天赋等级
     */
    public initUnlockAndLv(curPage:number):void {
        let talentPage = modTalent.getTalentData();
        let userTalent = talentPage[curPage].talent;
        for (let i = 0; i < userTalent.length; i++) {
            let talent = userTalent[i];
            let id = talent[0];
            this.iconGroup[id-1]["Mask"].visible = false;
            this.iconGroup[id-1]["lv"] = talent[1];
            this.lvGroup[id-1].text = `${talent[1]}/${this._maxLv[id-1]}`;
            if(talent[1] > 0){
                this.iconGroup[id-1]["box"].visible = true;
            }

            if (talent[1] == this._maxLv[id-1]){
                this.lvGroup[id-1].textColor = 0x91bd32;
            }
        }
        modTalent.setUnlock(curPage);
    }

    /** 显示是否要显示遮罩 */
    public ShowCanClickTalent():void{
        for(let i:number = 0; i < this.iconGroup.length; i++){
            if(!modTalent.isUnlock(this.page, i + 1)){
                this.iconGroup[i]["Mask"].visible = true;
            }
            else this.iconGroup[i]["Mask"].visible = false;
        }
    }

    /**
     * 重置
     */
    public reset(curPage:number):void {
        modTalent.setUnlock(curPage);
        for (let i = 0; i < modTalent.talentCount; i++) {
            this.iconGroup[i]["Mask"].visible = true;
            this.iconGroup[i]["box"].visible = false;
            this.iconGroup[i]["lv"] = 0;
            this.lvGroup[i].text = `0/${this._maxLv[i]}`;
            this.lvGroup[i].textColor = Common.TextColors.lvNotFull;
        }
        this.ShowCanClickTalent();
    }

    /**
     * 设置解锁的状态
     */
    public setUnlock(id:number):void {
        this.iconGroup[id-1]["Mask"].visible = false;
    }

    /**
     * 设置等级
     */
    public setTalentLv():void {
        this.iconGroup[this.curTalentId-1]["lv"] ++;
        let level = this.iconGroup[this.curTalentId-1]["lv"];
        this.lvGroup[this.curTalentId-1].text = `${level}/${this._maxLv[this.curTalentId-1]}`;
        this.iconGroup[this.curTalentId-1]["box"].visible = true;
        if (level == this._maxLv[this.curTalentId-1]){
            this.lvGroup[this.curTalentId-1].textColor = 0x91bd32;
        }
    }

    public setTalentDetail(pageCount:number):void {
        this.pageText.text = `第${pageCount}页`;
    }

    /**当前选中的天赋id */
    private curTalentId:number;
    /** */
    private talentGroup:eui.Group;
    /**吸血点数 */
    private bloodText:eui.Label;
    /**暴击点数 */
    private critText:eui.Label;
    /**回复 */
    private recoverText:eui.Label;
    private pageText:eui.Label;
    /**页数 */
    public page:number;
    /**位置 */
    private position = [[48,62],[272,62],[160,130],[48,198],[272,198],[160,246],[160,366]];
    /**天赋组 */
    private iconGroup:Array<eui.Group>;
    /**等级 */
    private lvGroup:Array<eui.Label>;
    /**最大等级 */
    private _maxLv:Array<number>;
}