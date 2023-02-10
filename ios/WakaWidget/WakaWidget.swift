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
  
  

  func getReactNativeData() ->Car?{
//    var car = Car(make: "Chevy", model: "Volt", owner: "Vladislav")
    /* Since it's Codable, we can convert it to JSON using JSONEncoder */
//    let carData = try! JSONEncoder().encode(car)
//    let shaderDefaults = UserDefaults.init(suiteName: widgetGroupId)!.set(carData, forKey: "car")
    var reactNativeData:Car? = nil
//    if(shaderDefaults != nil){
      do{
        let encodedData = UserDefaults(suiteName: widgetGroupId)!.string(forKey: "carData") as? Data
        
        if encodedData == nil{
          let car = Car(make: "Chevy", model: "Vot", owner: "Vladislav")
          let carData = try! JSONEncoder().encode(car) as? Data
          let decoder = JSONDecoder()
          reactNativeData = try decoder.decode(Car.self, from: carData!)
          return reactNativeData
        }
        
        
        let decoder = JSONDecoder()
        if(encodedData != nil){
          reactNativeData = try decoder.decode(Car.self, from: encodedData!)
        }
      }
      
      catch{
        print("Error: \(error)")
      }
//    }
    return reactNativeData
  }

  func getEntry() ->SimpleEntry{
    let reactNativeData = getReactNativeData()
    if(reactNativeData != nil){
      return SimpleEntry(date: Date(), configuration: ConfigurationIntent(), text: reactNativeData?.model ?? "No car model founded")
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


    // let nextRefresh = Calendar.current.date(byAdding: .minute, value: 5, to: entry.date)!
    // let timeline = Timeline(entries: [entry], policy: .after(nextRefresh))
    // completion(timeline)
      // let userDefaults = UserDefaults.init(suiteName: "group.com.hydromoll.wakatime")
      // if userDefaults != nil {
      //   let entryDate = Date()
      //   if let savedData = userDefaults!.value(forKey: "widgetKey") as? String {
      //       let decoder = JSONDecoder()
      //       let data = savedData.data(using: .utf8)
      //       if let parsedData = try? decoder.decode(WidgetData.self, from: data!) {
      //           let nextRefresh = Calendar.current.date(byAdding: .minute, value: 5, to: entryDate)!
      //           let entry = SimpleEntry(date: nextRefresh, configuration: configuration, text: parsedData.text)
      //           let timeline = Timeline(entries: [entry], policy: .atEnd)
      //           completion(timeline)
      //       } else {
      //           print("Could not parse data")
      //       }
      //   } else {
      //     let nextRefresh = Calendar.current.date(byAdding: .second, value: 30, to: entryDate)!
      //       let entry = SimpleEntry(date: nextRefresh, configuration: configuration, text: "No data set")
      //       let timeline = Timeline(entries: [entry], policy: .atEnd)
      //       completion(timeline)
      //   }
      // }
  }

  

  struct MyWidgetEntryView : View {
    var entry: Provider.Entry
      
    var body: some View {
          VStack {
            Text(entry.text)
              .bold()
              .foregroundColor(.black)
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
