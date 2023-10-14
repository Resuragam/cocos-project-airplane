import { _decorator, Component, EventTouch, Input, input, Node } from 'cc';
import { GameManager } from '../frameWork/GameManager';
const { ccclass, property } = _decorator;

@ccclass('UiMain')
export class UiMain extends Component {
    @property
    public planeSpeed = 1;

    @property(Node)
    public playerPlane: Node = null;

    @property(GameManager)
    public gameManager: GameManager = null;

    start() {
        this.node.on(Input.EventType.TOUCH_START, this._touchStart, this);
        this.node.on(Input.EventType.TOUCH_MOVE, this._touchMove, this);
        this.node.on(Input.EventType.TOUCH_END, this._touchEnd, this);
    }

    update(deltaTime: number) {}

    private _touchStart(touch: EventTouch) {
        this.gameManager.isShooting(true);
    }

    private _touchMove(touch: EventTouch) {
        const delta = touch.getDelta();
        let pos = this.playerPlane.position;
        this.playerPlane.setPosition(pos.x + 0.075 * this.planeSpeed * delta.x, pos.y, pos.z - 0.075 * this.planeSpeed * delta.y);
    }

    private _touchEnd(touch: EventTouch) {
        this.gameManager.isShooting(false);
    }
}
