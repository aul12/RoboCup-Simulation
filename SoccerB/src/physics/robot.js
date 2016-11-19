function Robot() {
    this.props = 0;
}

Robot.prototype = new GameObject(0, 0, 20);
Robot.prototype.constructor = GameObject;