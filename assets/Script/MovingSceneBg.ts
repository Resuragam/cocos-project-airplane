import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MovingSceneBg')
export class MovingSceneBg extends Component {
    @property(Node)
    backgroundFront: Node = null;
    @property(Node)
    backgroundBack: Node = null;

    private _backgroundSpeed = 1;
    private _backgroundMovingRange = 10;

    start() {
        this._init();
    }

    update(deltaTime: number) {
        this._moveBackground(deltaTime);
    }

    private _init() {
        this.backgroundFront.setPosition(0, 0, 0);
        this.backgroundBack.setPosition(0, 0, this._backgroundMovingRange);
    }

    private _moveBackground(deltaTime: number) {
        this.backgroundFront.setPosition(0, 0, this.backgroundFront.position.z + this._backgroundSpeed * deltaTime);
        this.backgroundBack.setPosition(0, 0, this.backgroundBack.position.z + this._backgroundSpeed * deltaTime);

        if (this.backgroundFront.position.z > this._backgroundMovingRange) {
            this.backgroundFront.setPosition(0, 0, this.backgroundBack.position.z - this._backgroundMovingRange);
        } else if (this.backgroundBack.position.z > this._backgroundMovingRange) {
            this.backgroundBack.setPosition(0, 0, this.backgroundFront.position.z - this._backgroundMovingRange);
        }
    }
}
