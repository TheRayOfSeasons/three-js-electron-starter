import Time from './time';

export default class WaitForSeconds {
  seconds: number;
  countdown: number;

  constructor(seconds: number) {
    this.seconds = seconds;
    this.countdown = seconds;
  }

  tick() {
    this.countdown -= Time.deltaTime;
  }
}
