class CountdownTimer {
  static instances = new Set();
  static ticker = null;

  constructor(selector, config, options = {}) {
    this.containers = [...document.querySelectorAll(selector)];
    if (!this.containers.length) return;

    this.onComplete = options.onComplete;
    this.lastValues = null;

    // Resolve deadline
    if (typeof config === 'string') {
      this.deadline = new Date(config).getTime();
    } else {
      const now = Date.now();
      const duration =
        (config.days || 0) * 86400000 +
        (config.hours || 0) * 3600000 +
        (config.minutes || 0) * 60000 +
        (config.seconds || 0) * 1000;

      this.deadline = now + duration;
    }

    if (isNaN(this.deadline)) return;

    // Cache DOM references once
    this.elements = this.containers.map(container => ({
      days: container.querySelector('[data-timer-days]'),
      hours: container.querySelector('[data-timer-hours]'),
      minutes: container.querySelector('[data-timer-minutes]'),
      seconds: container.querySelector('[data-timer-seconds]')
    }));

    CountdownTimer.instances.add(this);
    CountdownTimer.startTicker();
  }

  static startTicker() {
    if (this.ticker) return;

    const tick = () => {
      const now = Date.now();

      for (const instance of this.instances) {
        instance.update(now);
      }

      const delay = 1000 - (now % 1000);
      this.ticker = setTimeout(tick, delay);
    };

    tick();
  }

  static stopTickerIfIdle() {
    if (this.instances.size === 0 && this.ticker) {
      clearTimeout(this.ticker);
      this.ticker = null;
    }
  }

  update(now) {
    const diff = this.deadline - now;

    if (diff <= 0) {
      this.render(0, 0, 0, 0);
      this.destroy();
      this.onComplete?.();
      return;
    }

    const values = [
      Math.floor(diff / 86400000),
      Math.floor((diff / 3600000) % 24),
      Math.floor((diff / 60000) % 60),
      Math.floor((diff / 1000) % 60)
    ];

    // Prevent unnecessary DOM writes
    if (
      this.lastValues &&
      values.every((v, i) => v === this.lastValues[i])
    ) return;

    this.lastValues = values;
    this.render(...values);
  }

  render(d, h, m, s) {
    const dd = this.pad(d);
    const hh = this.pad(h);
    const mm = this.pad(m);
    const ss = this.pad(s);

    for (const el of this.elements) {
      if (el.days) el.days.textContent = dd;
      if (el.hours) el.hours.textContent = hh;
      if (el.minutes) el.minutes.textContent = mm;
      if (el.seconds) el.seconds.textContent = ss;
    }
  }

  pad(v) {
    return v < 10 ? '0' + v : '' + v;
  }

  destroy() {
    CountdownTimer.instances.delete(this);
    CountdownTimer.stopTickerIfIdle();
  }
}
