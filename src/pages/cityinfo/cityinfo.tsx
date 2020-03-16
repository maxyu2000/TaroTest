import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './cityinfo.scss'

export default class CityInfo extends Component {
  constructor()
  {
    console.log('in index page constru');
    super();
    this.state={
      city:String,
      result:null
    }
    this.appkey ='ff0c6cad9166801d324788cdb002325e'
    
  }
  componentWillMount () {
    this.state['city']=this.$router.params.city;
    this.getFuture=this.getFuture.bind(this)
   }

  componentDidMount () { 
    let comp=this;
    Taro.request({
      //url:'http://v.juhe.cn/weather/index',
      url:'http://127.0.0.1:18080/test-2.json'
      data:{
        cityname:this.state['city'],
        key:this.appkey
      },
      success:function(res){
        console.log(res.data);
        
        if(res.data.resultcode=="200"){
          comp.setState({
            result:res.data.result
          })
        }else{
          Taro.showModal({
            title: '访问天气接口错误',
            content: res.data.reason,
          })
        }
      },
      fail:function(res){
        console.log(res.errMsg);
        Taro.showModal({
          title: '访问天气接口错误',
          content: res.errMsg,
        })
      }
      
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }
  getFuture()
  {
    var items=[];
    const {result}=this.state;
     if(result!=null){
      items=result.future.map(dayobj=>{
        return dayobj;
      })
    }
    
    /*for (var prop in futureobj){
        console.log(futureobj[prop])
        let dayobj=futureobj[prop]
        items.push(
          <View><Text className='label'>时间:</Text><Text className='value'>dayobj.date} {dayobj.week}</Text></View>
        )
    }
    return (items);*/ 
    return items
  }

  render () {
    const items=this.getFuture();
    return (
      <View className='root-view'>
        <View><Text className='title'>{city}当前天气</Text></View>
        <View>
          <Text className='label'>温度：</Text><Text className='value'>{result.sk.temp}度</Text>
          <Text className='label'>   湿度：</Text><Text className='value'>{result.sk.humidity}</Text>
        </View>
        <View>
          <Text className='label'>风向：</Text><Text className='value'>{result.sk.wind_direction}</Text>
          <Text className='label'>   风力：</Text><Text className='value'>{result.sk.wind_strength}</Text>
        </View>
        <View><Text className='title'>今日预告</Text></View>
        <View><Text className='label'>时间:</Text><Text className='value'>{result.today.date_y} {result.totay.week}</Text></View>
        <View>
          <Text className='label'>天气:</Text><Text className='value'>{result.today.weather}</Text>
          <Text className='label'> 温度:</Text><Text className='value'>{result.today.temperature}</Text>
        </View>
        <View>
          <Text className='label'>风向:</Text><Text className='value'>{result.today.wind}</Text>
        </View>
        <View>
          <Text className='label'>穿衣指数:</Text><Text className='value'>{result.today.dressing_index}</Text>
        </View>
        <View>
          <Text className='label'>穿衣建议:</Text><Text className='value'>{result.today.dressing_advice}</Text>
        </View>
        <View>
          <Text className='label'>UV指数:</Text><Text className='value'>{result.today.uv_index}</Text>
          <Text className='label'>  洗晒指数:</Text><Text className='value'>{result.today.wash_index}</Text>
        </View>
        <View>
          <Text className='label'>外出指数:</Text><Text className='value'>{result.today.travel_index}</Text>
          <Text className='label'>  锻炼指数:</Text><Text className='value'>{result.today.exercise_index}</Text>
        </View>
        <View><Text className='title'>未来七日预告</Text></View>
        {items.map(dayobj=>{
          return (
            <View key={dayobj.date}><Text className='title'>时间:{dayobj.date} {dayobj.week}</Text></View>
          )
        })}
      </View>
    )
  }
}