import http from 'http';

test('index page test',()=>{
    http.request('http://localhost:8080/',(response: http.IncomingMessage)=>{
        expect(response.statusCode).toBe(200);
    });
});