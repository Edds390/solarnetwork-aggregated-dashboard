# SolarNetwork Aggregated Dash

This repository aggregates data from multiple nodes in the [SolarNetwork](http://solarnetwork.net/v4/) to be displayed on a single dashboard.

### Developer workflow

#### Running on local

1. At the parent directory (most likely `solarnetwork-aggregated-dashboard`) run `npm install` to update your node modules

2. run `npm start`

3. navigate to `http://localhost:3000/`

#### Branching

We have two protected branches `master` and `develop`

When making contributions your default workflow should be as follows.

1. `checkout` the `develop` branch.

2. Branch from `develop` using the following naming convention (separating your feature and bugfix names with hyphens).

* For features `feature/<MY-FEATURE-NAME>`
* For bugfixes `bugfix/<MY-BUGFIX-NAME>`

3. `commit` early and often to your branch and remember to frequently run `git pull origin develop` on your branch so you do not diverge.

4. When finished with your feature or bugfix `merge` and resolve conflicts with the `develop` branch locally before making a pull request.

5. Make your PR to the `develop` branch, once __two__ members have approved your PR you can then __Squash and Merge__ your commits to `develop`, then delete your branch.

*repeat 1 - 5 till release*

6. Once ready to make a release make a PR from `develop` to `master`.
