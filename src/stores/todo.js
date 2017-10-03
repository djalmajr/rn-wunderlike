import { computed, observable } from 'mobx';

class Todo {
  @observable id = undefined;
  @observable title = '';
  @observable starred = false;
  @observable position = 0;
  @observable createdAt = undefined;
  @observable completedAt = null;

  constructor(title, position, starred = false) {
    this.id = Date.now();
    this.title = title;
    this.position = position;
    this.starred = starred;
    this.createdAt = Date.now();
  }

  @computed get completed() {
    return !!this.completedAt;
  }
}

export default Todo;
