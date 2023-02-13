import WidgetKit
import SwiftUI
import Intents

private let widgetGroupId = "group.com.hydromoll.wakatime"



struct WidgetData: Decodable {
   var text: String
}
struct Car:Codable {
    var make : String
    var model : String
    var owner : String
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let configuration: ConfigurationIntent
    let text: String
}

struct Provider: IntentTimelineProvider {
  func placeholder(in context: Context) -> SimpleEntry {
      SimpleEntry(date: Date(), configuration: ConfigurationIntent(), text: "Placeholder")
  }
  

  

  func getReactNativeData() ->String?{
    var reactNativeData:String? = nil
      do{
        let encodedData = UserDefaults(suiteName: widgetGroupId)!.string(forKey: "Agee") as? String
        
        if encodedData != nil{
          reactNativeData = encodedData
          return reactNativeData
        }
        
        return "Data not found"
      }
  }

  func getEntry() ->SimpleEntry{
    let reactNativeData = getReactNativeData()
    if(reactNativeData != nil){
      return SimpleEntry(date: Date(), configuration: ConfigurationIntent(), text: reactNativeData ?? "No car model founded")
    }
    return SimpleEntry(date: Date(), configuration: ConfigurationIntent(), text: "No data set")

  }
  
  func getSnapshot(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {
      let entry = getEntry()
      completion(entry)
  }

  func getTimeline(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (Timeline<SimpleEntry>) -> Void) {
    var entries: [SimpleEntry] = []
    let entry = getEntry()
    entries.append(entry)
    let nextRefresh = Calendar.current.date(byAdding: .minute, value: 5, to: entry.date)!
    let timeline = Timeline(entries: entries, policy: .after(nextRefresh))
    completion(timeline)
  }

  
  
  private func circleCalculate(daily:Int, today:Int) -> CGFloat{
    
    let percentage = (today * 100) / daily
    
    return CGFloat(percentage / 100);
  }

  struct MyWidgetEntryView : View {
    var entry: Provider.Entry
    @StateObject var stats = ApiProvider()
    
    
//    let smallCircle = circleCalculate(daily: self.stats.dailyAverageSeconds, today: self.stats.todaySeconds)
    
    var body: some View {
          VStack {
            Text(entry.text)
              .bold()
              .foregroundColor(.black)
            Text(String(stats.todaySeconds))
              .bold()
              .foregroundColor(.black)
            ZStack{
              Circle()
                .trim(from: 0.5, to: 1)
                .stroke(lineWidth: 5)
                .foregroundColor(.cyan)
  //              .background(.red)
              Circle()
                .trim(from: 0.5, to: 0.8)
                .stroke(lineWidth: 3)
                .foregroundColor(.red)
  //              .background(.red)
            }
            
          }.padding(20)
    }
  }

  @main
  struct MyWidget: Widget {
      let kind: String = "MyWidget"

      var body: some WidgetConfiguration {
          IntentConfiguration(kind: kind, intent: ConfigurationIntent.self, provider: Provider()) { entry in
              MyWidgetEntryView(entry: entry)
          }
          .configurationDisplayName("My Widget")
          .description("This is an example widget.")
      }
  }

  struct MyWidget_Previews: PreviewProvider {
      static var previews: some View {
          MyWidgetEntryView(entry: SimpleEntry(date: Date(), configuration: ConfigurationIntent(), text: "Widget preview"))
              .previewContext(WidgetPreviewContext(family: .systemSmall))
      }
  }
}
