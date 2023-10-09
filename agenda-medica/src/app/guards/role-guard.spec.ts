import { Router } from '@angular/router';
import { RoleGuard } from './role-guard';
import { inject } from '@angular/core';

describe('RoleGuard', () => {
  it('should create an instance', () => {
    expect(new RoleGuard(inject(Router))).toBeDefined();
  });
});
