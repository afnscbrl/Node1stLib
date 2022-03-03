### Connecting to Twitter
Then, i built a python file with one class<a href="https://github.com/afnscbrl/TwitterToSql/blob/main/airflow/plugins/hooks/twitter_hook.py"> (twitter_hook.py)</a> that receive as an argument an airflow module named httphook. In this class i'll connect airflow to twitter api and giving in all the params that i wish receive of the twitter API like author id, twitter id, user id, create at, etc. Also, in this class i created a method that pages if i receive more than one page in the json file (for standard, the twitter API give us 10 tweets per page). <br/>
In airflow webserver i needed to creat a connection with these parameter:
<br/>
<img src="airflow/twitter_connection.png">

### Creating a DAG and Getting the data
Next, i made  other python script with one class<a href="https://github.com/afnscbrl/TwitterToSql/blob/main/airflow/plugins/operators/twitter_operator.py"> (twitter_operator.py)</a> that is the first task in airflow DAG. This script get a request made for Twitter_Hook and transform into airflow operator, then save the response. Continuing, i built other python file named <a href="https://github.com/afnscbrl/TwitterToSql/blob/main/airflow/dags/twitter_dag.py"> twitter_dag.py </a> responsible for creating a DAG in airflow and get the methods in twitter_operator to execute it when the task starts.<br/> All the others scripts created will be add in this file to compose the tasks orchestrade by the airflow. With this operator done, we need just start the DAG in airflow webserver to get the first stage (bronze) of the datalake.

### First tranformation of the data (Bronze to Silver)
In this step, i introduced the Apache Spark to manipulate the json file. This script <a href="https://github.com/afnscbrl/TwitterToSql/blob/main/spark/transformation.py">transformation.py</a> was the more complicated to me. In it, i had to "explode" the json struct to remove the "hierarchy" in the file. The original schema of json file was like that:
<br/>
<img src="spark/printSchema.png">
<br/><br/>
So, with the transformation.py i changed the struct of json file to something like that:
<img src="spark/printSchema2.png">
<br/><br/>
Look that the rows like author_id, like_count, etc are in the same columns, they aren't subparts of the others rows anymore. <br/>
Then i saved the output in Silver stage of the data lake. In this script i used pyspark.sql to manipulated the json file with the functions of this framework. The functions are named similarly to functions in pandas or querys in sql.<br/>
I put the script as a task in Airflow DAG and to connect Spark with Airflow, for this is necessary to configure a new connection in airflow webserver, but first we need install spark provider in airflow with ```pip install apache-airflow-providers-apache-spark``` and setup the connection with this params:
<img src="spark/spark_connection.png">
<br/>
<br/>
Now, the Airflow DAG is already to run the task to transform raw data into Silver Stage.

### Second transformation of the data (Silver to Gold)
Continuing the process, i selected some fields of the json file in silver stage to get it and rename it. I put them into a new json file in gold stage of the data lake. In this step i tried to simulate to get only values that are interesting for the business. The exemple of the result is here: <br/>
<img src="spark/gold_stage.png"> <br/>
With the tests done, i put the script as a task in Airflow DAG too.

### Filling a table database with the tweets of the Gold stage.
In final stage of the project i created a <a href="spark/to_sql.py">python file</a> to fill a Postgres database with a pre-extisting table. 
<img src="spark/postgres.png">
<br/> <br/>