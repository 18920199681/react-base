import asyncRouter from '@/utils/asyncRouter';

const Test = asyncRouter(() => import('./index'));

const TestRouter = [
  {
    path: '/test',
    exact: true,
    component: Test
  }
];

export default TestRouter;
