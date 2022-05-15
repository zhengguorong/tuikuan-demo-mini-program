export default class Queue<T> {
  private queue: T[] = [];

  // 入队列
  enqueue(item: T) {
    return this.queue.push(item);
  }

  // 出队列
  dequeue() {
    return this.queue.shift();
  }

  // 返回 队列的第一个
  head() {
    return this.queue[0];
  }

  // 返回队列中的最后一个
  tail() {
    return this.queue[this.size() - 1];
  }

  // 返回队列的大小
  size() {
    return this.queue.length;
  }

  // 判断队列是否为空
  isEmpty() {
    return !!this.size();
  }

  // 清空队列
  clear() {
    this.queue = [];
  }
}