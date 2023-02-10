//
//  DataSetter.m
//  WakatimeStats
//
//  Created by hydromoll on 10.02.2023.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE (DataSetter, NSObject)
RCT_EXTERN_METHOD(setData)
RCT_EXTERN_METHOD(getData)
RCT_EXTERN_METHOD(constantsToExport)

//RCT_EXTERN_METHOD(showValue)
@end
