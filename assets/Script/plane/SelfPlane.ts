import { _decorator, Component, EventTouch, Input, input, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SelfPlane')
export class SelfPlane extends Component {
    @property
    public planeSpeed = 1;

    start() {
        input.on(Input.EventType.TOUCH_MOVE, this._touchMove, this);
    }

    update(deltaTime: number) {}

    private _touchMove(touch: EventTouch) {
        const delta = touch.getDelta();
        let pos = this.node.position;
        this.node.setPosition(pos.x + 0.075 * this.planeSpeed * delta.x, pos.y, pos.z - 0.075 * this.planeSpeed * delta.y);
    }
}
