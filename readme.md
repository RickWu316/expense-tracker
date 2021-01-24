expense-tracker
===
expense-tracker 是一個可以協助你紀錄支出項目的網頁<br> 

### 

功能
============

1. 登入功能(2020/1/24 新增)
1. 使用者可瀏覽所有支出
2. 使用者可瀏覽不同分類/月份的支出 (2021/1/24新增月份篩選)
3. 使用者可新增支出項目
4. 使用者可修該支出項目
5. 使用者可刪除支出項目


# 需求環境
================
## global packages
* Node.js v10.15.0
* Express v4.17.1
* Express-handlebars v5.2.0
* body-parser v1.19.0
* mongoose v5.11.8
* bcryptjs v2.4.3
* connect-flash v0.1.1
* moment v2.29.1
* dotenv v8.2.0


 
## local packages

可於專案的 `package.json` 中查閱 `dependencies` 部分。<br> 

## database related

1. mongoDB: v4.2.11
2. Robo 3T: v1.4.2


# Installing
## 專案安裝流程
=======



1. clone 這個專案，在終端機輸入:
``` shell
git clone https://github.com/RickWu316/expense-tracker.git
```
2.  進入專案根目錄，安裝本地套件 (local packages)，在終端機輸入: 
```shell
npm install
```

3. 確認 mongoDB 執行後，連結 Robo 3T，建立一個資料庫，命名:

```
expense-tracker
```

4. 在終端機輸入指令來連結資料庫並新增種子資料:
```shell
npm run seed
```
5. 啟動伺服器，執行專案:
```shell
npm run dev
```

6. 打開瀏覽器，搜尋:
```
http://localhost/3000
```

7. 輸入帳密登入， 預設帳密: root@example.com /12345678
