const mocha =require( 'mocha');
const chai=require( 'chai');
const { expect } =require( 'chai');
const chaiHttp =require( 'chai-http');
const app =require( '../index');
const Article =require( '../models/articleModel');

const { it, describe, beforeEach, after } = mocha;

const testingData={
    title:'testing article title',
    content:'testing article content',
}
const testingDataUpdate={
    title:'testing article title update',
    content:'testing article content update',
}

const admin={
    email:'admin@gmail.com',
    password:'123456'
}

chai.expect();
chai.use(chaiHttp);

describe('Testing Blog routes', () => {
    beforeEach(async () => {
       
		await Article.deleteMany();
	});

    after(async () => {
		await Article.deleteMany();
	});
    it('should create new blog article.',async()=>{
        const adminSignin=await chai.request(app).post('/api/users/login').send(admin)
        const token = `Bearer ${adminSignin.body.token}`;
        const res=await chai.request(app).post('/api/article/add').send(testingData).set('Authorization', token)
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a('object')
    })
    it('should get all blog articles.',async()=>{
        const adminSignin=await chai.request(app).post('/api/users/login').send(admin)
        const token = `Bearer ${adminSignin.body.token}`;
        const res1=await chai.request(app).post('/api/article/add').send(testingData).set('Authorization', token)
        const res=await chai.request(app).get('/api/article/')
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a('array')
    }),
    it('should get one blog article by id',async()=>{
        const adminSignin=await chai.request(app).post('/api/users/login').send(admin)
        const token = `Bearer ${adminSignin.body.token}`;
        const res1=await chai.request(app).post('/api/article/add').send(testingData).set('Authorization', token)
        const article=await chai.request(app).get('/api/article/')
        const id=article.body[0]._id
        const res=await chai.request(app).get(`/api/article/${id}`)
        
        expect(res.status).to.be.equal(200)
        expect(res.body).to.be.a('object')
    }),
    it('should update blog article',async()=>{
        const adminSignin=await chai.request(app).post('/api/users/login').send(admin)
        const token = `Bearer ${adminSignin.body.token}`;
        const res1=await chai.request(app).post('/api/article/add').send(testingData).set('Authorization', token)
        const article=await chai.request(app).get('/api/article/')
        const id=article.body[0]._id
        const res=await chai.request(app).patch(`/api/article/update/${id}`).send(testingDataUpdate).set('Authorization', token)
        expect(res.status).to.be.equal(200)
        expect(res.body).to.be.a('object')
    }),
    it('should delete blog article',async()=>{
        const adminSignin=await chai.request(app).post('/api/users/login').send(admin)
        const token = `Bearer ${adminSignin.body.token}`;
        const res1=await chai.request(app).post('/api/article/add').send(testingData).set('Authorization', token)
        const article=await chai.request(app).get('/api/article/')
        const id=article.body[0]._id
        const res=await chai.request(app).delete(`/api/article/delete/${id}`).set('Authorization', token)
        expect(res.status).to.be.equal(200)
        expect(res.body).to.be.a('object')
    }),
    it('should comment on blog article',async()=>{
        const adminSignin=await chai.request(app).post('/api/users/login').send(admin)
        const token = `Bearer ${adminSignin.body.token}`;
        const res1=await chai.request(app).post('/api/article/add').send(testingData).set('Authorization', token)
        const article=await chai.request(app).get('/api/article/')
        const id=article.body[0]._id
        const res=await chai.request(app).post(`/api/article/comment/`).send(testingDataUpdate).set('Authorization', token).send({"article_id":id,
        "comment":"that content is very helpful thanks"})
        expect(res.status).to.be.equal(200)
        expect(res.body).to.be.a('object')
    })
})