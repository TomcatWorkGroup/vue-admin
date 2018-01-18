import Mock from 'mockjs'

const Companies =[];
for(let i = 0 ;i < 10; i++){
    Companies.push({
        id:Mock.Random.guid(),
        name:Mock.Random.cname(),
        addr:Mock.mock('@county(true)'),
        status: Mock.Random.integer(0, 1)
    });
}

export { Companies };