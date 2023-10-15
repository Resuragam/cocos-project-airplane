import { _decorator, BoxCollider, Collider, Component, ITriggerEvent, Node } from 'cc';
import { Constant } from '../frameWork/Constant';
import { GameManager } from '../frameWork/GameManager';
const { ccclass, property } = _decorator;

const OUTOFRANGE = 50;
@ccclass('EnemyPlane')
export class EnemyPlane extends Component {
    @property
    public craeteBulletTime = 0.5;

    private _enemySpeed: number = 0;
    private _needBullet = false;
    private _gameManager: GameManager = null;

    private _currCreateBulletTime = 0;

    public enemyType = Constant.EnemyType.TYPE1;
    start() {}

    onEnable() {
        const collider = this.node.getComponent(BoxCollider);
        collider.on('onTriggerEnter', this._onTriggerEnter, this);
    }

    protected onDisable(): void {
        const collider = this.node.getComponent(BoxCollider);
        collider.off('onTriggerEnter', this._onTriggerEnter, this);
    }

    update(deltaTime: number) {
        const pos = this.node.position;
        const movePos = pos.z + this._enemySpeed;
        this.node.setPosition(pos.x, pos.y, movePos);

        if (this._needBullet) {
            this._currCreateBulletTime = this._currCreateBulletTime + deltaTime;
            if (this._currCreateBulletTime > this.craeteBulletTime) {
                this._gameManager.createEnemyBullet(this.node.position);
                this._currCreateBulletTime = 0;
            }
        }

        if (movePos > OUTOFRANGE) {
            this.node.destroy();
        }
    }

    show(gameManager: GameManager, speed: number, needBullet: boolean) {
        this._gameManager = gameManager;
        this._enemySpeed = speed;
        this._needBullet = needBullet;
    }

    private _onTriggerEnter(event: ITriggerEvent) {
        const collisionGroup = event.otherCollider.getGroup();
        if (collisionGroup === Constant.CollistionType.SELF_PLANE || collisionGroup === Constant.CollistionType.SELF_BULLET) {
            this.node.destroy();
            this._gameManager.addScore()
        }
    }
}
