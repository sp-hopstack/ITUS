/**
 * HealthCheck class. This class provides a basic health check mechanism.
 * Over time, we can add more granularity by including checks for databases, caches, etc.
 */
class HealthCheck {
  constructor(status) {
    this.status = status;
    this.uptime = process.uptime();
  }
}

/**
 * A function that returns the health status of the application.
 *
 * @returns {HealthCheck} An object with a `status` property set to 'OK'.
 */
const health = () => new HealthCheck('OK');

export default health;
