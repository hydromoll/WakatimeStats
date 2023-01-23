//
//  WakaWidget.swift
//  WakaWidget
//
//  Created by hydromoll on 22.01.2023.
//

import WidgetKit
import SwiftUI
import Intents

struct Provider: IntentTimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), configuration: ConfigurationIntent())
    }

    func getSnapshot(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date(), configuration: configuration)
        completion(entry)
    }

    func getTimeline(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        var entries: [SimpleEntry] = []

        // Generate a timeline consisting of five entries an hour apart, starting from the current date.
        let currentDate = Date()
        for hourOffset in 0 ..< 5 {
            let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
            let entry = SimpleEntry(date: entryDate, configuration: configuration)
            entries.append(entry)
        }

        let timeline = Timeline(entries: entries, policy: .atEnd)
        completion(timeline)
    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let configuration: ConfigurationIntent
}

struct WakaWidgetEntryView : View {
    var entry: Provider.Entry

    var body: some View {
      HStack{
        Text("51 mins")
        Text("Today")
          .foregroundColor(.gray)
      }
        
      ZStack{
        Circle()
          .trim(from: 0.5, to: 1)
          .stroke(.blue, lineWidth: 20)
          .frame(width: 100, height: 100)
        Circle()
          .trim(from: 0.5, to: 0.8)
          .stroke(.red, lineWidth: 20)
          .frame(width: 100, height: 100)
      }
      Text("52% Decrease")
      HStack{
        Text("1 hr 39 mins")
        Text("Dayily Average")
      }
      Spacer()
      
      
      
    }
}

@main
struct WakaWidget: Widget {
    let kind: String = "WakaWidget"

    var body: some WidgetConfiguration {
        IntentConfiguration(kind: kind, intent: ConfigurationIntent.self, provider: Provider()) { entry in
            WakaWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("My Widget")
        .description("This is an example widget.")
    }
}

struct WakaWidget_Previews: PreviewProvider {
    static var previews: some View {
        WakaWidgetEntryView(entry: SimpleEntry(date: Date(), configuration: ConfigurationIntent()))
            .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}
