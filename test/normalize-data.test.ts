import { doesNotReject } from 'assert'
import { handler } from '../lambda/normalize-data/index'



describe('normalize-data', () => {
  it.skip('works', (done) => {
    const event = 
    {
       "Records":[
          {
             "eventID":"1",
             "eventName":"INSERT",
             "eventVersion":"1.0",
             "eventSource":"aws:dynamodb",
             "awsRegion":"us-east-1",
             "dynamodb":{
                "Keys":{
                   "Id":{
                      "N":"101"
                   }
                },
                "NewImage":{
                   "Message":{
                      "S":"New item!"
                   },
                   "Id":{
                      "N":"101"
                   }
                },
                "SequenceNumber":"111",
                "SizeBytes":26,
                "StreamViewType":"NEW_AND_OLD_IMAGES"
             },
             "eventSourceARN":"stream-ARN"
          },
          {
             "eventID":"2",
             "eventName":"MODIFY",
             "eventVersion":"1.0",
             "eventSource":"aws:dynamodb",
             "awsRegion":"us-east-1",
             "dynamodb":{
                "Keys":{
                   "Id":{
                      "N":"101"
                   }
                },
                "NewImage":{
                   "Message":{
                      "S":"This item has changed"
                   },
                   "Id":{
                      "N":"101"
                   }
                },
                "OldImage":{
                   "Message":{
                      "S":"New item!"
                   },
                   "Id":{
                      "N":"101"
                   }
                },
                "SequenceNumber":"222",
                "SizeBytes":59,
                "StreamViewType":"NEW_AND_OLD_IMAGES"
             },
             "eventSourceARN":"stream-ARN"
          },
          {
             "eventID":"3",
             "eventName":"REMOVE",
             "eventVersion":"1.0",
             "eventSource":"aws:dynamodb",
             "awsRegion":"us-east-1",
             "dynamodb":{
                "Keys":{
                   "Id":{
                      "N":"101"
                   }
                },
                "OldImage":{
                   "Message":{
                      "S":"This item has changed"
                   },
                   "Id":{
                      "N":"101"
                   }
                },
                "SequenceNumber":"333",
                "SizeBytes":38,
                "StreamViewType":"NEW_AND_OLD_IMAGES"
             },
             "eventSourceARN":"stream-ARN"
          }
       ],
        "window": {
            "start": "2020-07-30T17:00:00Z",
            "end": "2020-07-30T17:05:00Z"
        },
        "state": {
            "1": "state1"
        },
        "shardId": "shard123456789",
        "eventSourceARN": "stream-ARN",
        "isFinalInvokeForWindow": false,
        "isWindowTerminatedEarly": false
    }
    
    handler(event, {}, (err, data) => {
      if (err) return done(err);
      console.log(data)
    })
  })
})