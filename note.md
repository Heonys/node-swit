#트윗 스키마
id: string;
text: string;
createAt: Date;
name: string
username: string;
url?: string

#get
/tweets : 모든 포스트  
/tweets?usernmae=username : 특정 유저의 모든 포스트
/tweets/:id : 특정 id 포스트

#post
/tweets : 트윗 추가 req: {text, name, username, url}

#put
/tweets:id : 특정 id의 트윗 수정 req: {text}

#delete
/tweets:id : 특정 id 트윗 삭제
