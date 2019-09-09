import * as u from './util';

export default function Camera({ fov = u.rad(70), 
                                 aspect = 1,
                                 near = 1,
                                 far = 2000 }) {

  this.fov = fov;
  this.aspect = aspect;
  this.near = near;
  this.far = far;

  this.pos = [0, 0, 0];
  this.target = [0, 0, 0];
  this.up = [0, 1, 0];
}
