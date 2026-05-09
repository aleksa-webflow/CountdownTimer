# ⏱️ CountdownTimer – Example Usage

This example demonstrates how to use the `CountdownTimer` class with three common scenarios:

1. Fixed deadline (event launch)  
2. Session-based countdown (resets on refresh)  
3. Custom duration countdown  

---

## 🧱 HTML Structure

```html
<div class="wrapper">

  <!-- Timer 1: Full (days + time) -->
  <div class="timer timer--boxed" id="timer-full">
    <div class="time-block">
      <span data-timer-days>00</span>
      <label>Days</label>
    </div>
    <div class="time-block">
      <span data-timer-hours>00</span>
      <label>Hours</label>
    </div>
    <div class="time-block">
      <span data-timer-minutes>00</span>
      <label>Minutes</label>
    </div>
    <div class="time-block">
      <span data-timer-seconds>00</span>
      <label>Seconds</label>
    </div>
  </div>

  <!-- Timer 2: Minutes + seconds (compact) -->
  <div class="timer timer--inline" id="timer-compact">
    <span data-timer-minutes>00</span>
    <span class="separator">:</span>
    <span data-timer-seconds>00</span>
  </div>

  <!-- Timer 3: Hours + minutes + seconds -->
  <div class="timer timer--card" id="timer-medium">
    <div class="time-pill">
      <span data-timer-hours>00</span>
      <small>h</small>
    </div>
    <div class="time-pill">
      <span data-timer-minutes>00</span>
      <small>m</small>
    </div>
    <div class="time-pill">
      <span data-timer-seconds>00</span>
      <small>s</small>
    </div>
  </div>

</div>
```

## 🚀 Usage (Quick Reference)

### Fixed deadline
```js
<script>
document.addEventListener('DOMContentLoaded', () => {

  // 1. Fixed deadline (global event / launch)
  new CountdownTimer('#timer-full', '2026-06-01T12:00:00', {
    onComplete: () => {
      const el = document.getElementById('timer-full');
      if (el) el.textContent = '🚀 Launched!';
    }
  });

  // 2. 15-minute session timer (resets on refresh)
  new CountdownTimer('#timer-compact', { minutes: 15 }, {
    onComplete: () => {
      const el = document.getElementById('timer-compact');
      if (el) el.textContent = 'Expired';
    }
  });

  // 3. 1h 30min timer (resets on refresh)
  new CountdownTimer('#timer-medium', { hours: 1, minutes: 30 });

});
</script>
```
