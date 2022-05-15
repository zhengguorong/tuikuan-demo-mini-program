import Queue from "@/utils/queue";

export default class RequestQueue<T extends Function> extends Queue<T> {
  // 循环出队列
  eachDequeue() {
    if (this.isEmpty()) {
      const item = this.dequeue();
      if (item) {
        item();
      }
      this.eachDequeue();
    }
  }
}
