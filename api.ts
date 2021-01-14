import {Router} from 'https://deno.land/x/oak/mod.ts';
import * as planets from './models/planets.ts';
import * as launches from './models/launches.ts';

const router = new Router();

router.get('/', (ctx) => {
    ctx.response.body =  
  ` 88888b.  8888b. .d8888b  8888b.  
    888 "88b    "88b88K         "88b 
    888  888.d888888"Y8888b..d888888 
    888  888888  888     X88888  888 
    888  888"Y888888 88888P'"Y888888 
        Mission Control API`;
});

router.get('/planets', (ctx) => {
    ctx.response.body = planets.getAllPlanets();
})

router.get('/launches', (ctx) => {
    ctx.response.body = launches.getAll();
})

router.get('/launches/:id', (ctx) => {
  if (ctx.params?.id) {
    const launchesList = launches.getOne(Number(ctx.params.id));
    if (launchesList) {
      ctx.response.body = launchesList;
    } else {
      ctx.throw(400, `Launch with that id doesn't exist`);
    }
    
  }
  
})


router.delete('/launches/:id', (ctx) => {
  if (ctx.params?.id) {
    const result = launches.removeOne(Number(ctx.params.id)); 
    ctx.response.body = {success: result}
  }
})

router.post('/launches', async ctx => {
  const value = await ctx.request.body().value;
  launches.addOne(value);

  ctx.response.body = {success: true};
  ctx.response.status = 201;
})
 
export default router;