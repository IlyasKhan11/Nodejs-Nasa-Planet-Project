'use strict';

const {parse}=require('csv-parse')
const fs=require('fs')

const results=[]

function isHabitablePlanets(planet){
    return planet['koi_disposition']==='CONFIRMED' && planet['koi_insol']>0.36 && planet['koi_insol']<1.11 && planet['koi_prad']<1.6
}

fs.createReadStream('exoPlanets.csv')
    .pipe(parse({
        comment:'#',
        columns:true,
    }))
    .on('data',(data)=>{
        if (isHabitablePlanets(data)){
            results.push(data)
        }
    })
    .on('end',()=>{
        console.log(`${results.length} planets found`)
        console.log(results.map((planet)=>{
            return planet['kepler_name']
        }))
    })
    .on('error',(err)=>{
        console.log(err)
    })



